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
export default function ModalCar({ carObject, closeHandler, saveChanges, carsArrows }) {

    console.log("MORE THAN ONE CAR?", carsArrows);
    console.log("Car Object:",carObject);
    // if (carObject.length < 2){
        const [carChanged, setChanges] = useState({
            car_manufacturer: (carObject && carObject.manufacturer) ? carObject.manufacturer : "",
            car_model: (carObject && carObject.model) ? carObject.model : "",
            car_name: (carObject && carObject.carName) ? carObject.carName : "",
            car_fuel: (carObject && carObject.fuel) ? carObject.fuel : "",
            userID: (carObject && carObject.userID) ? carObject.userID : ""
        }) 
    // }
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

        if (e.type === "click")
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
                {!carsArrows ?
                    <>
                        <div style={style.headerModal}>
                            <h1 style={{ color: "#ffffff" }}>Carro</h1>
                            <CustomCloseButton
                                handleClick={closeHandler}
                                bgColor="#4169E1"
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
                                style={readOnly ? style.headerDefault : { ...style.headerButton, backgroundColor: "#ff0000" }}>
                                {readOnly ? "Editar" : "Cancelar"}
                            </button>
                        </div>
                        <p style={style.headerModalLine}></p>
                    </> : 
                    <div>
                        <button>&lt;</button>
                        <button>&gt;</button>
                    </div>
                    }

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
        width: "50%",
        height: "50%",
        position: "relative"
    },
    headerModal: {
        backgroundColor: "#000080",
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
        backgroundColor: "#4169E1",
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
        backgroundColor: "#191970",
        color: "#ffffff",
        border: "none",
        cursor: "pointer"
    }
};