import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const setContent =(process, Component, data) => {
        switch(process) {
            case 'waiting': 
                return <Skeleton />
            case 'loading':
                return <Spinner />
            case 'confirmed':
                return <Component data={data}/> 
            case 'error':
                return <ErrorMessage />
            default:
                throw new Error('Unexpected process state')
        }
}

export default setContent