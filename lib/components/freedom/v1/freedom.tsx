import { useState, useEffect } from 'react'
import { TextArea, Intent, RadioGroup, Radio, Tag } from '@blueprintjs/core'
import { handleStringChange } from "@blueprintjs/docs-theme";

export interface FreedomProps {

}

const FreedomMessages = {
    DEFAULT: 'Please enter input to see whether or not you have freedom...',
    IS_FREE: 'Yes.',
    IS_NOT_FREE: 'No.'
}

export function Freedom(props: FreedomProps) {
    const [freedomFromValue, setFreedomFromValue] = useState<'yes' | 'no'>(null);
    const [freedomToValue, setFreedomToValue] = useState<'yes' | 'no'>(null)

    const [scenarioDescription, setScenarioDescription] = useState('');

    const [isFree, setIsFree] = useState<boolean>(null)
    const [freedomMessage, setFreedomMessage] = useState(FreedomMessages.DEFAULT)
    const [messageIntent, setMessageIntent] = useState<Intent>(Intent.PRIMARY)

    const handleFreedomValidation = () => {
        if (typeof freedomFromValue === 'string' && typeof freedomToValue === 'string') {
            if (freedomFromValue === 'yes' && freedomToValue === 'yes') {
                setIsFree(true)
                setMessageIntent(Intent.SUCCESS)
            }
            else {
                setIsFree(false)
                setMessageIntent(Intent.DANGER)
            }
        }
    }

    useEffect(() => {
        if (typeof isFree === 'boolean') {
            if (isFree) {
                setFreedomMessage(FreedomMessages.IS_FREE)
            }
            else {
                setFreedomMessage(FreedomMessages.IS_NOT_FREE)
            }
        }
    }, [isFree])

    useEffect(() => {
        handleFreedomValidation();
    }, [freedomFromValue, freedomToValue])

    return (
        <div>
            <style global jsx>{`

                .freedom__scenario {
                    margin-top: 48px;
                }

                .freedom__scenario__textarea {
                    font-size: 12px;
                    width: 100%;
                }

                .freedom__from {
                    margin-top: 24px;
                }

                .freedom__scenario-description {
                    margin-top: -10px;
                    height: 30px;
                }

            `}</style>
            <div className="freedom__scenario-description">
                <strong>to {scenarioDescription}</strong>?
            </div>
            <div className="freedom__answer">
                <Tag intent={messageIntent}>{freedomMessage}</Tag>
            </div>
            <div className="freedom__scenario">
                <h3>
                    Describe the choice of action you are assessing. "I would like to..."
                </h3>
                <TextArea
                    className="freedom__scenario__textarea"
                    onChange={(e) => setScenarioDescription(e.target.value)}
                    growVertically={true}
                    large={true}
                    intent={Intent.PRIMARY}
                />
            </div>
            <div className="freedom__from">
                <h3>
                    Can you choose this option without being blocked by some external entity?
                </h3>
                <div>
                    <RadioGroup
                        label="Freedom from an External Entity, to have an available option"
                        onChange={handleStringChange((value: 'yes' | 'no') => {
                            setFreedomFromValue(value)
                        })}
                        selectedValue={freedomFromValue}
                    >
                        <Radio label="yes" value="yes" />
                        <Radio label="no" value="no" />
                    </RadioGroup>
                </div>
            </div>
            <div className="freedom__to">
                <h3>
                    Can you take action on this option based on your means (resources, skills, bandwidth)?
                </h3>
                <div>
                    <RadioGroup
                        disabled={freedomFromValue === 'no'}
                        label="Freedom to Act Upon an Available Option"
                        onChange={handleStringChange((value: 'yes' | 'no') => {
                            setFreedomToValue(value)
                        })}
                        selectedValue={freedomToValue}
                    >
                        <Radio label="yes" value="yes" />
                        <Radio label="no" value="no" />
                    </RadioGroup>
                </div>
            </div>
        </div>
    )
}
