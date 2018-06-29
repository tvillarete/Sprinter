export default class ApiManager {
   constructor() {
      this.mode = 'cors';
      this.url = 'https://vast-wave-50282.herokuapp.com';
   }

   getQuestionnaire(category) {
      return this.makeRequest({
         url: `${this.url}/${category.toLowerCase()}`,
         data: {},
      });
   }

   getResults(answers) {
      return this.makeRequest({
         url: `${this.url}/questionnaire`,
         data: {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(answers)
         },
      });
   }

   makeRequest(options) {
      const { url, data } = options;

      return new Promise(function(resolve, reject) {
         fetch(url, data)
            .then(response => {
               response.json().then(data => {
                  if (response.status >= 300) {
                     reject(data.message);
                  }
                  resolve(data);
               });
            })
            .catch(e => {
               reject(Error(e));
            });
      });
   }
}
