export const helpers = {

  limitText: (text, length) => {
    try {
      return text.length > length ? text.substr(0, length) + ' ...' : text;
    } catch (error) {
      // console.warn('Um erro ocorreu', error);
    }
  },

  captalizeFirstChart: (text) => {
    var words = text.toLowerCase().split(" ");
    for (var a = 0; a < words.length; a++) {
      var w = words[a];
      words[a] = w[0].toUpperCase() + w.slice(1);
    }
    return words.join(" ");
  },

  maskPhone: (phone) => {

    phone = phone.replace(/\D/g, "");
    phone = phone.replace(/^(\d{2})(\d)/g, "($1) $2");
    phone = phone.replace(/(\d)(\d{4})$/, "$1-$2");

    return phone

  },

  maskDocuments: (value) => {

    value = value.replace(/\D/g, '');
    if (value.length <= 11) {
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else {
      return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    }

  },

}