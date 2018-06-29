import ApiManager from '../../api_manager';

export default class YelpManager {
   constructor({ address, name }) {
      this.address = address;
      this.name = name;
      this.url = 'https://api.yelp.com/v3/businesses';
      this.token =
         'XXd5Lxab-L-zaltX4OdylVclMO6gAII1vqit4k0K8TnGs4pLkZw8StxTbJ2n6MUhRiheA3a_8nuDOxf7BG96QOmuypitKndTlWFwvbFQ1w-6oMGQkvzFjoDjvyMUW3Yx';
      this.corsAnywhere = 'https://cors-anywhere.herokuapp.com/';
      this.api = new ApiManager();
   }

   getBusiness() {
      const { address, name, api } = this;

      return api.makeRequest({
         url: `${this.corsAnywhere}${
            this.url
         }/search?location=${address}&term=${name}`,
         data: {
            method: 'GET',
            headers: {
               Authorization: `Bearer ${this.token}`,
            },
         },
      });
   }

   getDetails(_id) {
      const { api } = this;

      return api.makeRequest({
         url: `${this.corsAnywhere}${
            this.url
         }/${_id}`,
         data: {
            method: 'GET',
            headers: {
               Authorization: `Bearer ${this.token}`,
            },
         },
      });
   }

   getReviews(_id) {
      const { api } = this;

      return api.makeRequest({
         url: `${this.corsAnywhere}${
            this.url
         }/${_id}/reviews`,
         data: {
            method: 'GET',
            headers: {
               Authorization: `Bearer ${this.token}`,
            },
         },
      });
   }
}
