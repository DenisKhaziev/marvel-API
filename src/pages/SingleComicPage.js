import './singleComicPage.scss';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelServices from '../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import xMen from '../resources/img/x-men.png';

const SingleComicPage = (props) => {

    const {id} = useParams()
    const [comics, setComics] = useState(null)
    const {loading, error, getComics, clearError} = useMarvelServices()

     useEffect(() => {
        updateComics()
        
    }, [props.id])

    const updateComics = () => {
        clearError()
            getComics(id)
            .then(onComicsLoaded)
    }

    const onComicsLoaded =(comics) => {
        setComics(comics)
    }

    // const skeleton = comics || loading || error ? null : <Skeleton />
    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error || !comics) ? <View comics={comics}/> : null
    return (
        <div className="single-comic">
            {/* {skeleton} */}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

    const View =({comics}) => {
        const {id, title, description, pageCount, thumbnail, language, price} = comics

        return (
            <>  
                <div className="single-comic">
                    <img src={thumbnail} alt="x-men" className="single-comic__img"/>
                    <div className="single-comic__info">
                        <h2 className="single-comic__name">{title}</h2>
                        <p className="single-comic__descr">{description}</p>
                        <p className="single-comic__descr">{pageCount}</p>
                        <p className="single-comic__descr">{language}</p>
                        <div className="single-comic__price">{price}</div>
                    </div>
                    <Link to='/comics' href="#" className="single-comic__back">Back to all Comics</Link>
                </div>
            </>
        )

    }


    // return (
    //     <div className="single-comic">
    //         <img src={xMen} alt="x-men" className="single-comic__img"/>
    //         <div className="single-comic__info">
    //             <h2 className="single-comic__name">X-Men: Days of Future Past</h2>
    //             <p className="single-comic__descr">Re-live the legendary first journey into the dystopian future of 2013 - where Sentinels stalk the Earth, and the X-Men are humanity's only hope...until they die! Also featuring the first appearance of Alpha Flight, the return of the Wendigo, the history of the X-Men from Cyclops himself...and a demon for Christmas!?</p>
    //             <p className="single-comic__descr">144 pages</p>
    //             <p className="single-comic__descr">Language: en-us</p>
    //             <div className="single-comic__price">9.99$</div>
    //         </div>
    //         <a href="#" className="single-comic__back">Back to all</a>
    //     </div>
    // )


export default SingleComicPage;