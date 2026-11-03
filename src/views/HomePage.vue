<template>
  <ion-page>
    <ion-content>
      <!-- Tombol Refresh -->
      <div class="top-bar">
        <ion-button class="refresh-button" @click="loadData" :disabled="loading">
          Refresh
        </ion-button>
      </div>

      <!-- Loading & error -->
      <p v-if="loading" class="loading-text">Memuat data...</p>
      <p v-else-if="error" class="error-text">{{ error }}</p>

      <!-- Daftar crypto -->
      <div v-else class="crypto-list">
        <div v-for="coin in cryptos" :key="coin.id" class="crypto-card">
          <div class="col col-rank">
            <span class="label">Rank</span>
            <span class="big rank-title">{{ coin.rank }}</span>
          </div>
          <div class="col col-name">
            <span class="label">{{ coin.name }}</span>
            <span class="big">{{ coin.symbol }}</span>
          </div>
          <div class="col col-price">
            <span class="label">USD</span>
            <span class="big">{{ coin.price_usd }}</span>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { IonPage, IonContent, IonButton } from '@ionic/vue';
import { getCryptos } from '@/services/coinlore';
import type { Crypto } from '@/services/coinlore';

const cryptos = ref<Crypto[]>([]);
const loading = ref(false);
const error = ref('');

const loadData = async () => {
  loading.value = true;
  error.value = '';
  try {
    const data = await getCryptos();
    cryptos.value = data.slice(0, 7); // tampilkan rank 1-7 sesuai contoh soal
  } catch (e) {
    error.value = 'Tidak dapat memuat data. Periksa koneksi internet.';
  } finally {
    loading.value = false;
  }
};

onMounted(loadData);
</script>

<style scoped>
.top-bar {
  display: flex;
  justify-content: center;
  padding: 16px 0 12px;
  background: #fff;
}
.refresh-button {
  --background: #0a58d6;
  --border-radius: 6px;
  text-transform: none;
}
ion-content {
  --background: #ffffff;
}
.loading-text,
.error-text {
  text-align: center;
  margin-top: 30px;
}
.loading-text { color: #666; }
.error-text { color: #d33; }

.crypto-list {
  border-top: 1px solid #e0c96a;
}
.crypto-card {
  display: grid;
  grid-template-columns: 1fr 1.6fr 1.8fr;
  align-items: center;
  padding: 8px 12px;
  background: #fff0cc;
  border-bottom: 1px solid #e0c96a;
  color: #000;
}
.col {
  display: flex;
  flex-direction: column;
}
.col-rank { align-items: center; }
.label { font-size: 11px; }
.big { font-size: 20px; }
</style>