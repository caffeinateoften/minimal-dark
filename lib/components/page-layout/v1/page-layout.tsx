export interface PageLayoutProps {
    header: React.ReactNode
    children: React.ReactNode
}

const MARGIN_TOP = '120px'

const MARGIN_SIDES_SMALL = '0px';
const MARGIN_SIDES_MEDIUM = '15vw';

export function PageLayout(props: PageLayoutProps) {
    return (
        <div className='page'>
            <style global jsx>{`

                html, body {
                    height: 100vh;
                }

                .page {
                    background-color: #F8F8F8;
                    height: 100vh;
                }

                .page-content-container {
                        display: flex;
                        position: relative;
                        max-width: 1100px;
                        margin-top: ${MARGIN_TOP};
                        margin-left: ${MARGIN_SIDES_SMALL};
                        margin-right: ${MARGIN_SIDES_SMALL};
                    }
                    
                    @media only screen and (min-width: 600px) {
                        .page-content-container {
                            margin-left: ${MARGIN_SIDES_MEDIUM};
                            margin-right: ${MARGIN_SIDES_MEDIUM};
                        }
                    }
            `}</style>
            <div>
                {props.header}
            </div>
            <div className="page-content-container">
                {props.children}
            </div>
        </div>
    )
}
