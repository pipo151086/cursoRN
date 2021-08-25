import React, { createContext, useState } from 'react';
export const PspContext = createContext({});
export const { PspConsumer } = PspContext;

export const PspProvider = ({ children }) => {
  const initialPsp = {
    isLoading: false,
  };

  const [currentPsp, setCurrentPsp] = useState();
  const [currentAsesor, setCurrentAsesor] = useState();
  const [currentOferta, setCurrentOferta] = useState();
  const [bloqueoVisible, setBloqueoVisible] = useState(false);
  const [currentImages, setImages] = useState([]);
  const [scheduleVisible, setScheduleVisible] = useState(false);
  const [denyVisible, setDenyVisible] = useState(false);
  const [filterCampaignValue, setFilterCampaignValue] = useState();
  const [insuranceVisible, setInsuranceVisible] = useState(false);
  const [beneficiariesVisible, setBeneficiariesVisible] = useState(false);
  const [cuota, setCuota] = useState(1000);
  const [offerCalculated, setOfferCalculated] = useState(false);
  const [insuranceCalculated, setInsuranceCalculated] = useState(false);
  const [montoLiqCal, setMontoLiqCal] = useState(0);
  const [extraDataVisible, setExtraDataVisible] = useState(false);
  const [tblAmortVisible, setTblAmortVisible] = useState(false);
  
  const [contactadoInfoOK, setContactadoInfoOK] = useState(false);
  //const [contactadoInfoOK, setContactadoInfoOK] = useState(false);
  const [cumplePolInfoOK, setCumplePolOK] = useState(false);

  const [gestionesModalVisible, setGestionesModalVisible] = useState(false);

  const changeTblAmortVisible = value => {
    setTblAmortVisible(value);
  }

  const changeGestionesModalVisible = (value) => {
    setGestionesModalVisible(value);
  }

  const resetPspContext = () => {
    setCurrentPsp();
    setCurrentOferta();
  }

  const changeMontoLiqSol = value => { setMontoLiqCal(value) }

  const changeInsuranceCalculated = value => {
    setInsuranceCalculated(value);
  }

  const changeOfferCalculated = value => {
    setOfferCalculated(value);
  }

  const changeCuota = value => {
    setCuota(+value);
  };

  const changeBeneficiariesVisible = value => {
    setBeneficiariesVisible(value);
  }

  const changeInsuranceVisible = value => {
    setInsuranceVisible(value);
  };

  const changeFilterCampaignValue = value => {
    setFilterCampaignValue(value);
  };

  const changeScheduleVisible = value => {
    setScheduleVisible(value);
  };
  const changeDenyVisible = value => {
    setDenyVisible(value);
  };

  const changeImages = imgs => {
    setImages(imgs);
  };

  const changeBloqueoVisible = value => {
    setBloqueoVisible(value);
  };

  const addPsp = psp => {
    setCurrentPsp(psp);
  };

  const addAsesor = asesor => {
    setCurrentAsesor(asesor);
  };

  const addOferta = oferta => {
    setCurrentOferta(oferta);
  };

  const pspContext = {
    currentPsp, addPsp,
    currentAsesor, addAsesor,
    currentOferta, addOferta,
    bloqueoVisible, changeBloqueoVisible,
    currentImages, changeImages,
    scheduleVisible, changeScheduleVisible,
    denyVisible, changeDenyVisible,
    filterCampaignValue, changeFilterCampaignValue,
    insuranceVisible, changeInsuranceVisible,
    beneficiariesVisible, changeBeneficiariesVisible,
    cuota, changeCuota,
    offerCalculated, changeOfferCalculated,
    montoLiqCal, changeMontoLiqSol,
    insuranceCalculated, changeInsuranceCalculated,
    resetPspContext,
    tblAmortVisible, changeTblAmortVisible,
    extraDataVisible, setExtraDataVisible,
    contactadoInfoOK, setContactadoInfoOK,
    cumplePolInfoOK, setCumplePolOK,
    gestionesModalVisible, changeGestionesModalVisible
  };

  return (
    <PspContext.Provider value={pspContext}>{children}</PspContext.Provider>
  );
};
