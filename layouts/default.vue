<template>
    <div>
        <nav class="flex-no-wrap relative flex w-full items-center bg-[#95cacc] justify-between py-2 lg:flex-wrap lg:justify-start lg:py-4">
            <div class="flex w-full flex-wrap items-center justify-between px-3">
                <div class="text">{{ $t('app_name') }}</div>
            </div>
        </nav>
        <div class="container mx-auto">
            <NuxtPage />
        </div>
    </div>
</template>