import React from 'react'

const inputForm = ({generate, setGenerate, ipAddress, setIpAddress}) => {
    const onEnter = (e) => {
        if (e.key === 'Enter'){
            e.preventDefault()
            setGenerate(true)
        }
    }
    return (
        <form className='add-form container' style={{display: !generate ? 'block' : 'none'}}>
            <h1>Please Input EHUB IP Address</h1>
            <div className='form-control' style={{'-webkit-app-region': 'no-drag'}}>
                <label>IP Address: </label>
                <input type='text' value={ipAddress} onChange={e => setIpAddress(e.target.value)} onKeyPress={onEnter}/>
            </div>
            <btn className='btn btn-block' type='submit' style={{textAlign: 'center', '-webkit-app-region': 'no-drag'}} onClick={() => setGenerate(true)}>Generate Chart</btn>
        </form>
    )
}

export default inputForm
