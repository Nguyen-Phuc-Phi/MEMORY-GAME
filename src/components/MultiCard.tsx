import { useEffect, useState } from 'react';
import SingleCard from './SingleCard';
import '../styles/MultiCard.scss'
import React from 'react'
import data from '../data/data.json'

interface Cards{
    id:string,
    matched:boolean,
    src:string
}

function MultiCard() {
    const cardImg =data;    
    const [numclick,setNumClick]=useState<number>(0)
    const [cards, setCards] = useState<any>([]);
    const [turns, setTurns] = useState<number>(0);
    const [choiceOne, setchoiceOne] = useState<Cards|null>(null);
    const [choiceTwo, setchoiceTwo] = useState<Cards|null>(null);
    const [disabled, setdisabled] = useState<boolean>(false);
    const [block,setBlock]=useState<boolean>(false)
    
    const shuffleCard = () => {
        const shuffledCard = [...cardImg, ...cardImg].sort(() => Math.random() - 0.5).map((card) => ({ ...card, id: Math.random() }));        
        setchoiceOne(null)
        setchoiceTwo(null)
        setCards(shuffledCard);
        setTurns(0)
    }

    useEffect(() => {
        shuffleCard();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    
    const handleChoice = (card:Cards) => {        
        choiceOne ? setchoiceTwo(card) : setchoiceOne(card)
    }

    const resetTurn = () => {
        setchoiceOne(null)
        setchoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1);
        setdisabled(false)
        setBlock(false)
        setNumClick(0)
    }

    const checkNumClick=(num:number)=>{
        let newNum= numclick + num;
        if(newNum >=2){            
            setBlock(true);
            setNumClick(0);
        }else{
            setNumClick(newNum);
        }
    }

    useEffect(() => {
        if (choiceOne && choiceTwo) {            
            if (choiceOne.src === choiceTwo.src) {
                setdisabled(true)
                setCards((prevCards:any) => {                    
                    return prevCards.map((card:any) => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true }
                        } else {
                            return card;
                        }
                    })
                })
                resetTurn()
            } else {
                setTimeout(() => {
                    resetTurn()
                }, 1000)
            }
        }
    }, [choiceOne, choiceTwo]);    
    return (
        <div>
            <button onClick={shuffleCard}>New Game</button>
            <div className="card-grid">
                {cards.map((card:Cards) => (
                    <SingleCard key={card.id} card={card} handleChoice={handleChoice} flipped={card === choiceOne || card === choiceTwo || card.matched} disabled={disabled} numClick={checkNumClick} blockCard={block}/>
                ))}
            </div>
            <div className="turn">Turn : {turns}</div>
        </div>
    )
}

export default MultiCard