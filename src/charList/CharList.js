import { useState, useEffect, useRef } from 'react';
import './charList.scss';


import useMarvelServices from '../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { useMemo } from 'react';
// import setContent from '../utils/setContent';

// import abyss from '../resources/img/abyss.jpg';

const setContent =(process, Component, newItemLoading) => {
        switch(process) {
            case 'waiting': 
                return <Spinner />
                break 
            case 'loading':
                return newItemLoading ? <Component/>: <Spinner />
                break
            case 'confirmed':
                return <Component /> 
                break
            case 'error':
                return <ErrorMessage />
            default:
                throw new Error('Unexpected process state')
        }
}

const CharList =(props) => {
    const [charlist, setCharlist] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnded, setCharEnded] = useState(false)


    

    const {loading, error, getAllCharacters, process, setProcess} = useMarvelServices()

    useEffect(() => {
        onRequest(offset, true)
    }, [])


    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)        
        
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'))


    }

    

    const onCharListLoaded = (newCharList) => {
        let ended = false
        if(newCharList.length < 9) {
            ended=true
        }

        setCharlist(charList => [...charList, ...newCharList])
        setNewItemLoading(newItemLoading => false)
        setOffset(offset => offset+9)
        setCharEnded(charEnded => ended)
    }

    
    const itemRefs = useRef([])
   

    const focusOnItem =(id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'))
        itemRefs.current[id].classList.add('char__item_selected')
        itemRefs.current[id].focus()

    }

   // следующий метод создан для оптимизации, чтобы не городить все в методе render
   function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle ={'objectFit' : 'cover'}
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle ={'objectFit' : 'unset'}
            }

            return (
                <li className="char__item"
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el}
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id)
                        focusOnItem(i)}
                    }>
                    onKeyPress={(e) => {
                        if (e.key === '' || e.key ==='Enter') {
                            props.onCharListLoaded(item.id)
                            focusOnItem(i)
                        }    
                    }}
                        <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                        <div className="char__name">{item.name}</div>
                </li>
            )
        })
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                 {items}
            </ul>
        )
   }
    // charCard = this.state.char.map(item => {
    //            return( <li className="char__item">
    //                     <img src={abyss} alt="abyss"/>
    //                     <div className="char__name">Abyss</div>
    //                 </li>
    //            )

    //         })

    
        // const items = renderItems(charlist)
        
        // ниже создаем переменные для помещения уже их в return
        // const errorMessage = error ? <ErrorMessage/> : null;
        // const spinner = loading && !newItemLoading? <Spinner/> : null;
        
        const elements = useMemo(() => {
            return setContent(process, () => renderItems(charlist), newItemLoading)
        }, [process])

        return (

            <div className="char__list">
                {/* {errorMessage}
                {spinner}
                {items} */}
                {elements}
                <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display' : charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )

}

// CharList.propTypes = {
//     onCharSelected: propTypes.func.isRequired
// }

export default CharList;