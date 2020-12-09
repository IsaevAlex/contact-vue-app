<template>
    <div class="contactItem contactItem-mb">
        <img src="https://www.fillmurray.com/460/300" class="contactItem__img" alt="">
        <div class="contactItem__text">
            <h2 class="contactItem__name">
                {{ firstName }} {{ lastName }}
            </h2>
            <p class="contactItem__mail">
                {{ email }}
                <v-button @click="callRemoveConfirm" type="danger">Удалить</v-button>
            </p>

        </div>
    </div>
</template>

<script>
    import VButton from '@/components/button/v-button';

    export default {
        name: "v-contact-item",
        components:{
          VButton
        },
        props:{
            firstName:{
                type: String
            },
            lastName:{
                type: String
            },
            email: {
                type: String
            }
        },
        methods:{
            callRemoveConfirm(){
                this.$emit('callRemoveConfirm');
            }
        }

    }
</script>

<style scoped lang="scss">
    .contactItem{
        display: block;
        position: relative;
        top: 7vw;
        max-width: 400px;
        min-width: 320px;
        height: 250px;
        margin: auto;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.85);
        -webkit-transition: all 450ms ease-out 0s;
        transition: all 450ms ease-out 0s;
        overflow: hidden;

        &-mb{
            margin-bottom: 1.5em;
        }

        &:hover {
            box-shadow: 0 2px 35px rgba(#000, 0.85);
            &__text {
                background: rgba(#fff, 0.8);
                height: 50%;
                top: 50%;
                transition: all 450ms ease-in-out 0s;
            }
            &__mail{
                height: 60px;
                transition: all 350ms ease-in-out 0s;
            }
            &__link{
                visibility: visible;
            }
        }
        &__img{
            position: absolute;
            min-width: 100%;
            min-height: 100%;
            height: 100%;
            top: -9999px;
            left: -9999px;
            right: -9999px;
            bottom: -9999px;
            margin: auto;
            overflow: hidden;
        }
        &__name{
            color: rgba(0, 0, 0, 0.85);
            letter-spacing: 0.0225em;
            width: auto;
            margin: 0;
            font-family: 'Lato', sans-serif;

        }
        &__link{
            color: #378AEE;
            text-decoration: none;
            -webkit-transition: all 350ms linear;
            transition: all 350ms linear;
            visibility: hidden;
            font-family: 'Lato', sans-serif;

        }
        &__text{
            position: relative;
            background: rgba(255, 255, 255, 0.6);
            width: 100%;
            height: 40%;
            top: 60%;
            box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.3);
            padding: 10px 12px;
            overflow: hidden;
            -webkit-transition: all 450ms ease-in-out 0s;
            transition: all 450ms ease-in-out 0s;
            cursor: pointer;
        }
        &__mail{
            font-family: 'Lato', sans-serif;
            color: #555;
            width: 380px;
            height: 38px;
            margin: 8px 0;
            line-height: 1.25;
            text-overflow: ellipsis;
            overflow: hidden;
        }

    }
</style>
