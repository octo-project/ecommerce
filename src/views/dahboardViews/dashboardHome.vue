<template>
  <div class="w-full text-amber-500 p-5 !ml-[200px] gap-4 flex flex-col">
    <h1 class="text-xl !font-bold">Welcome to your dashboard!</h1>
    <div>
      <div class="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-xl font-semibold text-gray-800">Utilisateurs</h2>
            <p class="text-sm text-gray-500">Statistiques générales</p>
          </div>
          <div class="text-blue-600 bg-blue-100 rounded-full p-3">
            <!-- Icône utilisateur (ex: Heroicons) -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5.121 17.804A9.004 9.004 0 0112 15c2.216 0 4.254.805 5.879 2.137M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        </div>

        <div class="mt-6">
          <p class="text-3xl font-bold text-gray-900">12,450</p>
          <p class="text-sm text-gray-500">Utilisateurs inscrits au total</p>
        </div>

        <div class="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p class="text-sm text-gray-500">Nouveaux cette semaine</p>
            <p class="text-lg font-medium text-green-600">+320</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Actifs ce mois</p>
            <p class="text-lg font-medium text-blue-600">4,580</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
