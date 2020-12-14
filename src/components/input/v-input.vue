<template>
    <div class="customInput" >
        <input type="text" ref="input" :name="placeholder" class="customInput__input" :value="value" @input="updateValue($event.target.value)">
        <label class="customInput__placeholder" :for="placeholder">{{ placeholder }}</label>
    </div>
</template>

<script>
    export default {
        name: "v-input",
        props:{
            value:{
                type: String,
                default: ''
            },
            placeholder:{
                type: String,
                default: ' '
            },
            autofocus:{
                type: Boolean,
                default: false
            }
        },
        methods:{
            updateValue(value){
                this.$emit('input', value);
            }
        },
        watch:{
            autofocus(newVal){
                if (newVal){
                    this.$refs.input.focus();
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    $field-container-padding: 5px;
    $label-padding: $field-container-padding !default;
    .customInput{
        position: relative;
        border:1px solid #bcbaba;
        height:50px;
        padding-left:12px;

        &__placeholder{
            font-family: 'Lato', sans-serif;
            position: absolute;
            top: 50%;
            pointer-events: none;
            transition: all .14s ease-in-out;
            font-size:18px;
            color:#adadad;

        }


        &__input{
            color: #000;
            border:none;
            margin-top:20px;
            font-size: 16px;
            padding-top: 5px;
            display: block;
            box-sizing: border-box;
            width: 100%;
            bottom:0px;
            &:focus {
                outline: none;
            }
            &.c-fix,
            &:focus,
            &:not(:placeholder-shown)
            {
                border-color: transparent;
                ~ label {
                    color:#646669;
                    font-size: 11px;
                    //Come up with a calculation for this
                    top: calc(30% - .5rem);
                }
            }

            &::-webkit-input-placeholder {
                color: transparent;
            }
            &::-moz-placeholder {
                color: transparent;
            }
            &:-ms-input-placeholder {
                color: transparent;
            }

        }
    }
</style>
