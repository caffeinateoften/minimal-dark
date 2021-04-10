export interface ListProps {
    data: any[]
    renderItem: (value: any) => React.ReactNode
}

export const List: React.FC<ListProps> = (props) => {
    return (
        <div className="list">
            <style jsx>{`
                    .list {
                        display: flex;
                        flex-wrap: wrap;
                        position: relative;
                        width: 100%;
                    }

                    .list__item {
                        width: 100%;
                    }
                `}</style>
            {
                props.data.map((item) => (
                    <div key={item.id} className="list__item">
                        {props.renderItem(item)}
                    </div>
                ))
            }
        </div>
    )
}