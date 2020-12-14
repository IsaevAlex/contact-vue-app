<template>
    <div class="contactItem contactItem-mb">
        <img src="../../assets/images/user-profile.svg" class="contactItem__img" alt="">
        <div class="contactItem__text">
            <h2 class="contactItem__name">
                {{ firstName }} {{ lastName }}
            </h2>
            <p class="contactItem__mail">
                {{ email }}
            </p>
            <div class="contactItem__buttons">
                <div class="contactItem__removeBtn contactItem__btn contactItem__btn-mr">
                    <v-button @click="callRemoveConfirm" type="danger">Удалить</v-button>
                </div>
                <div class="contactItem__more contactItem__btn">
                    <router-link :to="{name: 'Contact', params: {id: index } }">
                        <v-button type="info">Подробнее</v-button>
                    </router-link>
                </div>
            </div>

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
            },
            index:{
                type: Number,
                required: true
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
        background-color: #fff;
        border-radius: .4rem;
        overflow: hidden;
        box-shadow: 0 3rem 6rem rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: 0.2s;
        &-mb{
            margin-bottom: 1.5em;
        }

        &:hover{
            transform: translateY(-0.5%);
            box-shadow: 0 4rem 8rem rgba(0, 0, 0, 0.2);
        }
        &__img{
            display: block;
            width: 100%;
            height: 12rem;
            object-fit: cover;
        }
        &__name{
            font-size: 1.5rem;
            font-weight: 500;
            color: #0d0d0d;
            margin-bottom: 1rem;
            font-family: 'Lato', sans-serif;
        }
        &__text{
            padding: 1rem 1rem;
        }
        &__mail{
            font-size: 1rem;
            letter-spacing: .1rem;
            line-height: 1.2;
            color: #3d3d3d;
            margin-bottom: 2rem;
            font-family: 'Lato', sans-serif;

        }
        &__buttons{
            display: flex;
            justify-content: flex-end;
        }
        &__btn{
            &-mr{
                margin-right: 8px;
            }
        }

    }
</style>
