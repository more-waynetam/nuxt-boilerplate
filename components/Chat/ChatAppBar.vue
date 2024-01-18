<template>
     <v-app-bar color="transparent" density="compact" elevation="0" >
            <v-btn icon @click="$router.go(-1)">
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn class="d-md-none" icon="mdi-chat" @click="$emit('thread-drawer')"></v-btn>
            <v-btn class="d-md-none" icon="mdi-image" @click="$emit('extra-drawer')"></v-btn>
    </v-app-bar>
</template>