export interface PageLayoutProps {
    header: React.ReactNode
    children: React.ReactNode
}

const MARGIN_TOP = '120px'

const MARGIN_SIDES_EXTRA_SMALL = '5vw';
const MARGIN_SIDES_SMALL = 'calc((100vw - 700px)/2)';
const MARGIN_SIDES_MEDIUM = 'calc((100vw - 750px)/2)';

const FONT_SIZE_EXTRA_SMALL = '9px';
const FONT_SIZE_SMALL = '12px';
const FONT_SIZE_MEDIUM = '12px';

export function PageLayout(props: PageLayoutProps) {
    return (
        <div className='page'>
            <style global jsx>{`

                html, body, #__next {
                    height: 100%;
                }

                .page {
                    position: fixed;
                    background-color: #F8F8F8;
                    top: 0;
                    bottom: 0;
                    height: 100%;
                    width: 100%;
                    overflow-y: scroll;
                }

                .page-content-container {
                        position: relative;
                        max-width: 1100px;
                        margin-top: ${MARGIN_TOP};
                        margin-left: ${MARGIN_SIDES_EXTRA_SMALL};
                        margin-right: ${MARGIN_SIDES_EXTRA_SMALL};
                        font-size: ${FONT_SIZE_EXTRA_SMALL};
                }
                    
                @media only screen and (min-width: 1000px) {
                    .page-content-container {
                        margin-left: ${MARGIN_SIDES_SMALL};
                        margin-right: ${MARGIN_SIDES_SMALL};
                        font-size: ${FONT_SIZE_SMALL};
                    }
                }

                @media only screen and (min-width: 1300px) {
                    .page-content-container {
                        margin-left: ${MARGIN_SIDES_MEDIUM};
                        margin-right: ${MARGIN_SIDES_MEDIUM};
                        font-size: ${FONT_SIZE_MEDIUM};
                    }
                }

                .right-sider {
                    height: 80px;
                    width: 100px;
                    backgroundColor: orange;
                }

            `}</style>
            <div>
                {props.header}
            </div>
            <div className="page-content-container">
                {props.children}
            </div>
            <div className="right-sider">
            </div>
        </div>
    )
}
