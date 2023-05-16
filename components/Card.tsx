import styles from "styles/components/Card.module.scss";

interface Props {
    children: React.ReactNode;
    center?: boolean;
    className?: string;
}

const Card = ({ children, className, center = false }: Props) => {
    return (
        <div className={[styles.base, center ? styles.center : "", className].join(" ")}>
            {children}
        </div>
    );
};

export default Card;
