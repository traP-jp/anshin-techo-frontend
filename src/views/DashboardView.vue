<!-- チケット一覧のページ -->
<template>
  <div class="h-100 d-flex flex-column align-center justify-center">
    <div :class="$style.table">
      <v-table>
        <thead>
          <tr>
            <th>チケットID</th>
            <th>タイトル</th>
            <th>ステータス</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>サンプルチケット1</td>
            <td>オープン</td>
          </tr>
          <tr>
            <td>2</td>
            <td>サンプルチケット2</td>
            <td>クローズド</td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>

<style module>
.table {
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 1000px;
  max-width: calc(100% - 32px);
}
</style>
