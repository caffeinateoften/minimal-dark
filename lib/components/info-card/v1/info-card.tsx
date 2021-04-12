
export interface InfoCardProps {
    interactable: boolean
}

export const InfoCard: React.FC<InfoCardProps> = (props) => {
    return <div className="info-card">
        <style jsx>{`
            .info-card {
                cursor: ${props.interactable ? 'pointer' : ''};
                line-height: 46px;
                box-shadow: 0px 0px .5px 0px black;
                background-color: white;
                margin-bottom: 5px;
                padding-left: 16px;
            }
            .info-card:hover {
                background-color: ${props.interactable ? '#F8F8F8' : 'white'}
            }
        `}</style>
        {props.children}
    </div>
}