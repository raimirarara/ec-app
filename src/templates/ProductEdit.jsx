import { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { SetSizeArea } from "../components/Products";
import ImageArea from "../components/Products/ImageArea";
import { TextInput, SelectBox, PrimaryButton} from "../components/UIkit"
import { db } from "../firebase";
import { saveProduct } from "../reducks/products/operations";

const ProductEdit = () => {
    const dispatch = useDispatch()
    let id = window.location.pathname.split('/product/edit')[1]
    if(id !== ''){
        id = id.split('/')[1]
    }

    const [name, setName] = useState(''),
          [description, setDescription] = useState(''),
          [category, setCategory] = useState(''),
          [categories, setCategories] = useState([]),
          [gender, setGender] = useState(''),
          [sizes, setSizes] = useState([]),
          [images, setImages] = useState([]),
          [price, setPrice] = useState('');

    
    const inputName = useCallback((event) => {
        setName(event.target.value)
    },[setName])

    const inputDescription = useCallback((event) => {
        setDescription(event.target.value)
    },[setDescription])

    const inputPrice = useCallback((event) => {
        setPrice(event.target.value)
    },[setPrice])

    const inputSizes = useCallback((newSizes) => {
        setSizes(newSizes)
    },[setSizes])


    const genders = [
        {id: 'all', name: 'すべて'},
        {id: 'male', name: 'メンズ'},
        {id: 'female', name: 'レディース'}
    ]

    useEffect(() => {
        if (id !== ''){
            db.collection('products').doc(id).get()
                .then( snapshot => {
                    const data = snapshot.data()
                    setImages(data.images)
                    setName(data.name)
                    setDescription(data.description)
                    setCategory(data.category)
                    setGender(data.gender)
                    setPrice(data.price)
                    setSizes(data.sizes)
                })
        }
    },[id])
    
    useEffect(() => {
        db.collection('categories')
            .orderBy('order', 'asc')
            .get()
            .then(snapshots =>  {
                const list = []
                snapshots.forEach(snapshot => {
                    const data = snapshot.data()
                    list.push({
                        id: data.id,
                        name: data.name
                    })
                })
                setCategories(list)
            })
    },[])

    return(
        <section>
            <h2 className='u-text__headline u-text-center'>商品の登録・編集</h2>
            <div className='c-section-container'>
                <ImageArea images={images} setImages={setImages} required={true} />
                <TextInput 
                    fullWidth={true} label={'商品名'} multiline={false} required={true}
                    rows={1} value={name} type={'text'} onChange={inputName}
                />
                <TextInput 
                    fullWidth={true} label={'商品説明'} multiline={true} required={true}
                    rows={5} value={description} type={'text'} onChange={inputDescription}
                />
                <SelectBox
                    label={'カテゴリー'} required={true} options={categories} select={setCategory} value={category}
                />
                <SelectBox
                    label={'性別'} required={true} options={genders} select={setGender} value={gender}
                />
                <TextInput 
                    fullWidth={true} label={'価格'} multiline={false} required={true}
                    rows={1} value={price} type={'number'} onChange={inputPrice}
                />
                <div className='module-spacer--medium' />
                <SetSizeArea sizes={sizes} setSizes={inputSizes} />
                <div className='module-spacer--medium' />
                <div className='center'>
                    <PrimaryButton 
                        label={'商品情報を保存'}
                        onClick={() => dispatch(saveProduct(id, name, description, category, gender, price, images, sizes))}
                    />
                </div>
            </div>
        </section>
    )
}
export default ProductEdit