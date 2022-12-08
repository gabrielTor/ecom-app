import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetErrors, resetSuccessM } from '../Redux/apiSlice'
import { getProductsPage } from '../Redux/productActions'
import { useToast } from '@chakra-ui/react'

export default function useSuccessOrError() {

    const dispatch = useDispatch()
    const toast = useToast()
    const success = useSelector(state => state.api.success)
    const error = useSelector(state => state.api.error)
    const products = useSelector(state => state.api.products)
  
    useEffect(()=>{
      if(success){
        toast({
          title: success.message,
          status: 'success',
          isClosable: true
        })
        dispatch(resetSuccessM())
      }
    },[success, toast, dispatch])
    
    useEffect(()=>{
      if(error){
        if((error.split(' ')[0] === 'Sorry' && !products.length) || (error === 'No results found' && !products.length)){
          dispatch(getProductsPage())
        }
        toast({
            title: error,
            status: 'error',
            isClosable: true
        })
        dispatch(resetErrors())
      }
  },[error, toast, products, dispatch])
  
}
