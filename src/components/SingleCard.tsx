import React from 'react'
import '../styles/SingleCard.scss'

interface Cards {
    id: string,
    matched: boolean,
    src: string
}
interface PropsFunction {
    handleChoice: (arg: Cards) => void;
    card: Cards,
    flipped: boolean,
    disabled: boolean,
    numClick: (arg: number) => void;
    blockCard: boolean
}
const SingleCard: React.FC<PropsFunction> = ({ card, handleChoice, flipped, disabled, numClick, blockCard }) => {  //Use react.fc to fix handlechoice is not function
    const handleClick = () => {
        numClick(1)
        if (!disabled && !blockCard)
            handleChoice(card)
    }
    return (
        <div className="card">
            <div className={card.matched ? "flipped hidden" : flipped ? "flipped" : ""}>
                <img alt='' src={card.src} className="front" />
                <img alt='' src="/img/cover.png" className="back" onClick={handleClick} />
            </div>
        </div>
    )
}
export default SingleCard