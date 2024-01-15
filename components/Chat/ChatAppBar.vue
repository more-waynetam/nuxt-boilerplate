<template>
     <v-app-bar color="transparent" density="compact" elevation="0" >
        <template v-slot:prepend>
            <v-btn icon @click="$router.go(-1)">
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
        </template>
    </v-app-bar>
</template>