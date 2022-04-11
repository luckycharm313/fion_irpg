export const PDF_URL = 'https://www.nwcg.gov/sites/default/files/publications/pms461.pdf';
export const getFileExtention = (fileUrl: string) => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ?
             /[^.]+$/.exec(fileUrl) : undefined;
  };