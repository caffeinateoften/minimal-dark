import { useState, useEffect } from 'react'
import { TextArea, Intent, RadioGroup, Radio, Tag } from '@blueprintjs/core'
import { handleStringChange } from "@blueprintjs/docs-theme";

export interface FreedomProps {

}

const FreedomMessages = {
    DEFAULT: 'Please enter input to see whether or not you have the freedom to do something...',
    IS_FREE: 'Yes.',
    IS_NOT_FREE: 'No.'
}

export function Freedom(props: FreedomProps) {
    const [freedomFromValue, setFreedomFromValue] = useState<'yes' | 'no'>(null);
    const [freedomToValue, setFreedomToValue] = useState<'yes' | 'no'>(null)
    const [withinReasonValue, setWithinReasonValue] = useState<'yes' | 'no'>(null)

    const [scenarioDescription, setScenarioDescription] = useState('');

    const [isFree, setIsFree] = useState<boolean>(null)
    const [freedomMessage, setFreedomMessage] = useState(FreedomMessages.DEFAULT)
    const [messageIntent, setMessageIntent] = useState<Intent>(Intent.PRIMARY)

    const handleFreedomValidation = () => {
        if (typeof freedomFromValue === 'string' && typeof freedomToValue === 'string') {
            if (freedomFromValue === 'yes') {
                if (freedomToValue === 'yes') {
                    setIsFree(true)
                }
                else if (withinReasonValue === 'yes') {
                    setIsFree(true)
                }
                else {
                    setIsFree(false)
                }
            }
            else {
                setIsFree(false)
            }
        }
    }

    useEffect(() => {
        if (typeof isFree === 'boolean') {
            if (isFree) {
                setFreedomMessage(FreedomMessages.IS_FREE)
                setMessageIntent(Intent.SUCCESS)
            }
            else {
                setFreedomMessage(FreedomMessages.IS_NOT_FREE)
                setMessageIntent(Intent.DANGER)
            }
        }
    }, [isFree])

    useEffect(() => {
        handleFreedomValidation();
    }, [freedomFromValue, freedomToValue, withinReasonValue])

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

                .freedom__the-question {
                    margin-top: 30px;
                }

                .freedom__the-question div {
                    padding-top: 12px;
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
                    Do you <span style={{ fontWeight: 900 }}>have the opportunity to choose</span> this without intererfance from an external entity?
                </h3>
                <div>
                    <RadioGroup
                        label="Freedom from an external entity"
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
                    Given an opportunity that you are free to choose, do you have the <span style={{ fontWeight: 900 }}>ability to act</span> on this opportunity? (Do you have the means: resources, skills, bandwidth?)
                </h3>
                <div>
                    <RadioGroup
                        disabled={freedomFromValue === 'no'}
                        label="Freedom to act, given an opportunity"
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
            <div className="freedom__within-reason-to-gain-freedom-to">
                <h3>
                    If you are given the opportunity, but do not currently have the ability to act on the opportunity, is it <span style={{ fontWeight: 900 }}>within reason</span> for you to gain the required means (resources, skills, bandwidth) to have the freedom to act on the opportunity?
                </h3>
                <div>
                    <RadioGroup
                        disabled={freedomToValue === 'yes' || freedomFromValue === 'no'}
                        label="Freedom to reasonably gain the means to act, given an opportunity"
                        onChange={handleStringChange((value: 'yes' | 'no') => {
                            setWithinReasonValue(value)
                        })}
                        selectedValue={withinReasonValue}
                    >
                        <Radio label="yes" value="yes" />
                        <Radio label="no" value="no" />
                    </RadioGroup>
                </div>
            </div>
            <div className="freedom__the-question">
                I am curious:
                <div>What <i>is</i> significant interference from an external entity? What <i>is</i> within reason for you to gain the required means to act?</div>
            </div>
        </div>
    )
}
