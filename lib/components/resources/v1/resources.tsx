export interface ResourcesProps {
    links: { text: string, url: string }[]
}

export const Resources: React.FC<ResourcesProps> = (props) => {
    return (
        <div className="freedom__resources">
            <style jsx>{`
                .freedom__resources {
                    margin-top: 48px;
                }
            `}</style>
            <h2>Interesting resources</h2>
            <ul>
                {props.links.map(link => (<li><a target="_blank" rel="noopener noreferrer" href={link.url}>{link.text}</a></li>))}
            </ul>
        </div>)
}