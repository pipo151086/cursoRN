export const iconResolver = docCode => {
  const route = '../../../../assets/icons/';
  if (docCode === 'DOC01') {
    return require(route + 'report-icon.png');
  } else if (docCode === 'DOC02') {
    return require(route + 'contract.png');
  } else if (docCode === 'DOC03') {
    return require(route + 'idcard-white.png');
  } else if (docCode === 'DOC04') {
    return require(route + 'idcard-white-back.png');
  } else if (docCode === 'DOC05') {
    return require(route + 'croquis.png');
  } else if (docCode === 'DOC06') {
    return require(route + 'contract.png');
  } else {
    return require(route + 'report-icon.png');
  }
};
