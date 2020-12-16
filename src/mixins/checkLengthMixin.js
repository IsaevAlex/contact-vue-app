export default {
    methods:{
        checkLengthValueInInput(){
            for (let i = 0; i < arguments.length; i++) {
                if (arguments[i] === 0) {
                    return false;
                }
            }
            return true;
        }
    }
};
