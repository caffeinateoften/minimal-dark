import { useState } from 'react'
import { TextArea, Intent, RadioGroup, Radio } from '@blueprintjs/core'
import { handleStringChange } from "@blueprintjs/docs-theme";

export interface FreedomProps {

}

export function Freedom(props: FreedomProps) {
    const [freedomFromValue, setFreedomFromValue] = useState<'yes' | 'no'>(null);
    const [freedomToValue, setFreedomToValue] = useState<'yes' | 'no'>(null)

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

            `}</style>
            <div className="freedom__scenario">
                <h3>
                    Describe the choice of action you are assessing. "I would like to..."
                </h3>
                <TextArea
                    className="freedom__scenario__textarea"
                    growVertically={true}
                    large={true}
                    intent={Intent.PRIMARY}
                />
            </div>
            <div className="freedom__from">
                <h3>
                    Do you have the option to choose this action without punishment or pressure from some external entity?
                </h3>
                <div>
                    <RadioGroup
                        label="Freedom from an External Entity"
                        onChange={handleStringChange((value: 'yes' | 'no') => setFreedomFromValue(value))}
                        selectedValue={freedomFromValue}
                    >
                        <Radio label="yes" value="yes" />
                        <Radio label="no" value="no" />
                    </RadioGroup>
                </div>
            </div>
            <div className="freedom__to">
                <h3>
                    Do you have the means (resources, skills, bandwidth) to act upon the option in front of you?
                </h3>
                <div>
                    <RadioGroup
                        label="Freedom to Act Upon an Available Option"
                        onChange={handleStringChange((value: 'yes' | 'no') => setFreedomToValue(value))}
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
