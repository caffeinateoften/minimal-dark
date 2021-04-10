import Link from 'next/link'

export interface LogoProps {
    text: string
}

export const Logo: React.FC<LogoProps> = (props) => {
    return (
        <>
            <style jsx>{`
                .logo {
                    cursor: pointer;
                }
            `}</style>
            <Link href="/">
                <div className="logo">{props.text}</div>
            </Link>
        </>
    )
}
