import React, { useEffect, useState } from 'react'
import API from '../../services/api'

const SliderShow = ()=> {
    const [name, setName] = useState()
    const [url, setUrl] = useState()
    const [image, setImage] = useState()
    const [sliders, setSliders] = useState([])
    const [sliderAddOpen, setSliderAddOpen] = useState()
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(file);
      };
    useEffect(()=>{
        async function getSliders() {
            const res = await API.get("slider/")
            setSliders(res.data.sliders)
        }

        getSliders()
    },[])

    async function addSlider() {
        const {data} = await API.post('/slider', {
            name:name,
            url:url,
            image:image
        })
        setSliders((prev)=>{
            return [
                ...prev,
                data.slider
            ]
        })
    }

    async function deleteSlider(id) {
        await API.delete(`/slider/${id}`)

        setSliders((prev)=>{
            return prev.filter(slider=>slider._id!=id)
        })
    }
    return(
        <div className="w-full">
            <h2>Sliders : </h2>
            <h2>{sliders && sliders.length == 0 && "No sliders"}</h2>
            <div className="p-5 flex flex-col">
                {sliders.map((slider, index)=>{
                    return (
                    <div key={index} className=" border-2 p-3 rounded bg-white shadow-md flex justify-between">
                        {slider.name}

                        <button onClick={()=>{deleteSlider(slider._id)}} className='px-2 py-1 bg-red-600 text-white rounded'>Delete</button>
                    </div>
                    )
                })}
            <div className=" border-2 p-3 rounded bg-white shadow-md">
                {sliderAddOpen?
                <div className='flex flex-col gap-2'>
                    <label htmlFor="url">NAME : <input type="text" className='w-full p-1 outline-none' id='url' onChange={(e)=>{setName(e.target.value)}} /></label>
                    <label htmlFor="url">URL : <input type="text" className='w-full p-1 outline-none' id='url' onChange={(e)=>{setUrl(e.target.value)}} /></label>
                    <label htmlFor="image">IMAGE : <input type="file" className='w-full p-1 outline-none' id='image'  onChange={handleFileChange} /></label>
                    <button className='py-3 px-6 bg-green-600 text-white font-bold rounded cursor-pointer' onClick={addSlider}>ADD</button>
                </div>
                :
                <div onClick={()=>{
                    setSliderAddOpen(true)
                }}>{sliders && sliders.length < 3 ? "Add Slider +":"Max number of sliders reached"}</div>}
            </div>
            </div>
            
        </div>
    )
}

export default SliderShow