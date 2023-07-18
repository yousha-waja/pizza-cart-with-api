 document.addEventListener("alpine:init", () => {
    Alpine.data('counter', ()=>({

      visibleS:false,
      visibleM:false,
      visibleL:false,
      visible:false,

      showS:true,
      hideS:false,

      showM:true,
      hideM:false,

      showL:true,
      hideL:false,

      showCart:false,
      hideCart:true,

      order: true,
      count:0,

      //properties list pizzaz
      pizzas : [],
      cart : [],
      username: 'yousha-waja',
      cartId : '8AI954cnY6',
      total:0.00,
      payment: '',
      change:0.00,
      isInputValid: false,
      message1: false,
      message2: false,

      getCart() {
        axios.get(`https://pizza-api.projectcodex.net/api/pizza-cart/${this.cartId}/get`).then((result) => {
          this.cart = result.data.pizzas;
          this.total = result.data.total;
      })
      },
            
      createCart(){
        axios.get('https://pizza-api.projectcodex.net/api/pizza-cart/create?username=yousha-waja').then((result)=>{
          this.cartId = result.data.cart_code;

          this.getCart();
        })
  },

      addPizza(pizzaId){
        axios.post('https://pizza-api.projectcodex.net/api/pizza-cart/add', {
          "cart_code" : this.cartId,
          "pizza_id" : pizzaId
        }).then(()=> {
          this.getCart();
        })
      },
      removePizza(pizzaId){
        axios.post('https://pizza-api.projectcodex.net/api/pizza-cart/remove', {
          "cart_code" : this.cartId,
          "pizza_id" : pizzaId
        }).then(()=> {
          this.getCart();
        })
      },
      amountPaid(payment){
        axios.post('https://pizza-api.projectcodex.net/api/pizza-cart/pay', {
          "cart_code" : this.cartId,
          "amount" : payment
        }).then((result)=> {
          if(result.data.status == "failure"){
            this.message1 = true;
            this.payment = '';
            this.isInputValid = false;
            setTimeout(() => {
              this.message1 = false;
            },4000)
          }
          else {
            this.message2 = true;
            this.isInputValid = false;
            this.change = this.payment - this.total;
            setTimeout(() => {
              this.createCart();
              this.message = '';
              this.total = 0;
              this.cart = [];
              this.message2 = false;
              this.payment = '';
            },3000)
          }
        })
      },
      
      init() {
        axios
        .get('https://pizza-api.projectcodex.net/api/pizzas')
        .then((result) => {
        this.pizzas = result.data.pizzas;
        });
        this.createCart();
      },
      
    }));
  });