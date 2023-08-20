import './SingleCharacterPage.scss';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelServices from '../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const SingleCharacterPage = (props) => {

    const {id} = useParams()
    const [char, setChar] = useState(null)
    const {loading, error, getCharacter, clearError} = useMarvelServices()

     useEffect(() => {
        updateChar()
        
    }, [props.id])

    const updateChar = () => {
        clearError()
            getCharacter(id)
            .then(onCharLoaded)
    }

    const onCharLoaded =(char) => {
        setChar(char)
    }

    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error || !char) ? <View char={char}/> : null
    return (
        <div className="single-comic">
            {/* {skeleton} */}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )

}

const View =({char}) => {
    const {name, description, thumbnail} = char
        return (
                <div className="single-comic">
                    <img src={thumbnail} alt={name} className="single-comic__char-img"/>
                    <div className="single-comic__info">
                        <h2 className="single-comic__name">{name}</h2>
                        <p className="single-comic__descr">{description}</p>
                    </div>
                </div>
            
        )
}


export default SingleCharacterPage;