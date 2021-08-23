import React, { useEffect, useState, useRef } from 'react';
import CustomInput from '../customInput/index';
import CustomCloseButton from '../customCloseButton'; 

/**
 * @file module:src/components/carModal
 * @param {array of data} carObject 
 * @param {function} closeHandler 
 * @param {function} saveChanges 
 * @returns a car modal with the information from the clicked line user
 */
export default function ModalCar({ carObject, closeHandler, saveChanges }) {
    const [carChanged, setChanges] = useState({
        car_manufacturer: (carObject && carObject.car_manufacturer) ? carObject.car_manufacturer : "",
        car_model: (carObject && carObject.car_model) ? carObject.car_model : "",
        car_name: (carObject && carObject.car_name) ? carObject.car_name : "",
        car_fuel: (carObject && carObject.car_fuel) ? carObject.car_fuel : "",
        userID : (carObject && carObject.userID) ? carObject.userID : ""
    });
    const [readOnly, setReadOnlyState] = useState(
        true
    )
    const myRef = useRef();

    function edit() {
        setReadOnlyState(!readOnly);
        // console.log(readOnly);
    }
    const closeListener = (e) => {
        if (e.keyCode === 27)
            closeHandler();

        if(e.type === "click")
            closeHandler();
    }
    // setting event listener to close modal in case of esc or outside click
    useEffect(() => {
        window.addEventListener("keydown", closeListener);
        window.addEventListener("click", closeListener);
        return () => { 
            window.removeEventListener("keydown", closeListener);
            window.removeEventListener("click", closeListener);
        }
    });

    return (
        <div style={style.parentDiv} >
            <div style={style.modalDiv} onClick={event => event.stopPropagation()} tabIndex="0" ref={myRef}>
                <div style={style.headerModal}>
                    <h1 style={{ color: "#ffffff" }}>Carro</h1>
                    <CustomCloseButton
                        handleClick={closeHandler}
                        bgColor= "#ffb5bc"
                    />
                </div>
                <div style={style.headerModalContent}>
                    <p style={style.headerModalLine}></p>
                    <CustomInput
                        autoFocus={true}
                        labelName="Marca "
                        type="text"
                        value={carChanged.car_manufacturer}
                        onChange={
                            event => setChanges(
                                currentState => ({ ...currentState, car_manufacturer: event.target.value })
                            )
                        }
                        readOnly={readOnly}
                    />
                </div>
                <div style={style.headerModalContent}>
                    <p style={style.headerModalLine}></p>
                    <CustomInput
                        labelName="Modelo "
                        type="text"
                        value={carChanged.car_model}
                        onChange={
                            event => setChanges(
                                currentState => ({ ...currentState, car_model: event.target.value })
                            )
                        }
                        readOnly={readOnly}
                    />
                </div>
                <div style={style.headerModalContent}>
                    <p style={style.headerModalLine}></p>
                    <CustomInput
                        labelName="Nome "
                        type="text"
                        value={carChanged.car_name}
                        onChange={
                            event => setChanges(
                                currentState => ({ ...currentState, car_name: event.target.value })
                            )
                        }
                        readOnly={readOnly}
                    />
                </div>
                <div style={style.headerModalContent}>
                    <p style={style.headerModalLine}></p>
                    <CustomInput
                        labelName="Combustível "
                        type="text"
                        value={carChanged.car_fuel}
                        onChange={
                            event => setChanges(
                                currentState => ({ ...currentState, car_fuel: event.target.value })
                            )
                        }
                        readOnly={readOnly}
                    />
                </div>
                <div style={style.headerModalContent}>
                    <p style={style.headerModalLine}></p>
                    {!readOnly ? <input type="submit" value="Salvar" onClick={() => saveChanges(carChanged)}
                        style={{ ...style.headerButton, backgroundColor: "#42ad55" }} /> : ""}
                    <button onClick={() => edit()}
                        style={readOnly ? style.headerDefault : {...style.headerButton,backgroundColor: "#ff0000"}}>
                        {readOnly ? "Editar" : "Cancelar"}
                    </button>
                </div>
                <p style={style.headerModalLine}></p>
            </div>
        </div >
    )
};

const style = {
    parentDiv: {
        backgroundColor: "rgb(163, 163, 163,0.8)",
        position: "fixed",
        zIndex: 10,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    modalDiv: {
        backgroundColor: "#fffafa",
        width: "50%",
        height: "50%",
        position: "relative"
    },
    modalButton: {
        fontSize: "15px",
        backgroundColor: "#ffc9c9",
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        borderColor: "#ffff",
        position: "absolute",
        top: "-4px",
        right: "-4px",
        color: "#525252"
    },
    headerModal: {
        backgroundColor: "#ff8f8f",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "20%",
    },
    headerModalContent: {
        height: "20%",
        backgroundColor: "#ffffff"
    },
    headerModalLine: {
        backgroundColor: "pink",
        width: "100%",
        height: "4px",
        marginTop: "0px"
    },
    headerButton: {
        fontSize: "20px",
        display: "inline",
        height: "50px",
        width: "40%",
        margin: "0 5%",
        backgroundColor: "#ff7d7d",
        color: "#ffffff",
        border: "none",
        cursor: "pointer"
    },
    headerDefault: {
        fontSize: "20px",
        display: "inline",
        height: "50px",
        width: "80%",
        margin: "0 10%",
        backgroundColor: "#ff7d7d",
        color: "#ffffff",
        border: "none",
        cursor: "pointer"
    }
};