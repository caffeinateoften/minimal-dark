import { useState } from 'react'
import { Row, Col } from 'antd'

export interface RationalityProps { }

interface ContextState {
    actionList: string[]
    constraintList: string[]
}

interface RationalityState {
    contextState: ContextState
}

export const Rationality: React.FC<RationalityProps> = (props) => {
    const [context, setContext] = useState()
    return (
        <>
            <Row>
                <Col>
                    <i>Intersubjective rationality:</i> The actions of an <b>agent</b> <i>A</i> are <i>intersubjectively rational</i> in a <b>context</b> <i>C</i> to the extent that the <b>evidence</b> available to and the <b>constraints</b> as understood by the collection <i>B</i> of <b>agents</b> in <i>C</i> are consistent with the achievement of <i>A</i>'s <b>objectives.</b>
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <h3>Why focus on intersubjectively rationality:</h3>
                    <ul>
                        <li>
                            <i>Subjective rationality</i> is too individual focused to be useful. An <b>individual</b> rarely is aware of all <b>evidence</b> and all <b>constraints</b> that exist with a <b>context</b> C.
                        </li>
                        <li>
                            <i>Objective rationality</i> is too hard. It requires every <b>constraint</b> and every bit of <b>evidence</b> within <b>context</b> <i>C</i> to be identified. Most of the time, this is impossible without reducing the scope of <b>context</b> <i>C</i> down to extremely small sizes. But <b>agent</b> <i>A</i> and their <b>objectives</b> are coupled to <i>context</i> <b>C</b>. Reducing the scope of <b>context</b> <i>C</i> ends up excluding the ability to evaluate how well <i>agent</i> <b>A</b>'s <b>actions</b> can be said to meet their <b>objectives</b>. This doesn't just mean that <i>objective rationality</i> isn't useful - it means <i>objective rationality</i> does not <i>exist</i> (most of the time).
                        </li>
                    </ul>
                </Col>
            </Row>
        </>
    )
}