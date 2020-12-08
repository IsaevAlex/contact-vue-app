<template>
    <div class="contactList">
        <div class="contactList__list"  v-if="contacts.length > 0">
            <v-contact-item
                    v-for="(contact, index) in contacts"
                    :firstName="contact.firstName"
                    :lastName = "contact.lastName"
                    :email = "contact.email"
                    :key="index"
            />
        </div>
        <div class="contactList__list" v-else>
            <h3 class="no-data">Нет контактов</h3>
        </div>
    </div>
</template>

<script>
    import VContactItem from '@/components/contact/v-contact-item';
    export default {
        name: "v-contact-list",
        components:{
            VContactItem
        },
        props:{
            contacts: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '@/assets/styles/layout';

</style>
