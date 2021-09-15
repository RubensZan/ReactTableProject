import React, { useEffect, useState, useRef } from 'react';
import CustomInput from '../customInput/index';
import CustomCloseButton from '../customCloseButton';
import { ControlButton } from './styles';

/**
 * @file module:src/components/carModal
 * @param {array of data} carsList 
 * @param {function} closeHandler 
 * @param {function} saveChanges 
 * @returns a car modal with the information from the clicked line user
 */
export default function ModalCar({ carsList, closeHandler, saveChanges, carsArrows }) {

    // console.log("MORE THAN ONE CAR?", carsArrows);
    // console.log("Car list:", carsList);
    const initialCarsList = carsList;

    const [currentCar, setCurrentCar] = useState(0)
    const [carChanged, setChanges] = useState(carsList)
    const [canPrevious, setCanPreviousCar] = useState(false)
    const [canForward, setCanForwardCar] = useState(carsArrows)
    const [readOnly, setReadOnlyState] = useState(true)
    const myRef = useRef();

    function edit() {
        setReadOnlyState(!readOnly);
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

    function goPrevious() {
        // first car
        if (currentCar === 0)
            return;

        // second car
        if (currentCar === 1) {
            setCanForwardCar(true);
            setCanPreviousCar(false);
            setCurrentCar(currentCar - 1);
            return;
        }

        setCanForwardCar(true);
        setCanPreviousCar(true);
        setCurrentCar(currentCar - 1);
    }
    function goNext() {
        // if the current car is the last
        if (carsList.length - 1 === currentCar)
            return;

        // if the current car is the penultimate 
        if (carsList.length - 2 === currentCar) {
            setCanPreviousCar(true);
            setCanForwardCar(false);
            setCurrentCar(currentCar + 1);
            return;
        }
        // else 
        setCanForwardCar(true);
        setCanPreviousCar(true);
        setCurrentCar(currentCar + 1);


    }

    const updateFieldChanged = (name, index) => (event) => {
        console.log(name);
        console.log(index);
        console.log(event.target.value);
        console.log("ALTERABLE",initialCarsList[index][name]);
        initialCarsList[index][name] = event.target.value; 
        setChanges([...carChanged]); 
    };


    return (
        <div style={style.parentDiv} >
            <div style={style.modalDiv} onClick={event => event.stopPropagation()} tabIndex="0" ref={myRef}>
                <div style={style.headerModal}>
                    <h1 style={{ color: "#ffffff" }}>Carro</h1>
                    <CustomCloseButton
                        handleClick={closeHandler}
                        bgColor="#4169E1"
                    />

                    <ControlButton onClick={goPrevious} able={canPrevious} style={{ position: "absolute", top: "5px", left: "5px" }}>&lt;&lt;</ControlButton>
                    <ControlButton onClick={goNext} able={canForward} style={{ position: "absolute", top: "5px", left: "40px" }}>&gt;&gt;</ControlButton>

                </div>
                <div style={style.headerModalContent}>
                    <p style={style.headerModalLine}></p>
                    <CustomInput
                        autoFocus={true}
                        labelName="Marca "
                        type="text"
                        value={carChanged[currentCar].manufacturer}
                        onChange={updateFieldChanged("manufacturer", currentCar)}
                        readOnly={readOnly}
                    />
                </div>
                <div style={style.headerModalContent}>
                    <p style={style.headerModalLine}></p>
                    <CustomInput
                        labelName="Modelo "
                        type="text"
                        value={carChanged[currentCar].model}
                        onChange={updateFieldChanged("model", currentCar)}
                        readOnly={readOnly}
                    />
                </div>
                <div style={style.headerModalContent}>
                    <p style={style.headerModalLine}></p>
                    <CustomInput
                        labelName="Nome "
                        type="text"
                        value={carChanged[currentCar].carName}
                        onChange={updateFieldChanged("carName", currentCar)}
                        readOnly={readOnly}
                    />
                </div>
                <div style={style.headerModalContent}>
                    <p style={style.headerModalLine}></p>
                    <CustomInput
                        labelName="Combustível "
                        type="text"
                        value={carChanged[currentCar].fuel}
                        onChange={updateFieldChanged("fuel", currentCar)}
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
        alignContent: "center",
        width: "100%",
        height: "20%"
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