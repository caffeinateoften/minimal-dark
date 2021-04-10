import { TextArea, Intent } from '@blueprintjs/core'

export interface FreedomProps {

}

export function Freedom(props: FreedomProps) {
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
            `}</style>
            <div className="freedom__scenario">

                <h3>
                    Describe the action you are assessing. "I would like to..."
                </h3>
                <TextArea
                    className="freedom__scenario__textarea"
                    growVertically={true}
                    large={true}
                    intent={Intent.PRIMARY}
                />
            </div>
        </div>
    )
}
