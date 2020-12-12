<script>
import Vue from 'vue'
import { SearchBox, PoweredBy, Results, Index, Highlight } from 'vue-instantsearch'

export default {
  components: {
    AisIndex: Vue.component('AisIndex', Index),
    AisSearchBox: Vue.component('AisSearchBox', SearchBox),
    AisResults: Vue.component('AisResults', Results),
    AisPoweredBy: Vue.component('AisPoweredBy', PoweredBy),
    AisHighlight: Vue.component('AisHighlight', Highlight),
  },
  data: () => ({
    ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
    ALGOLIA_KEY: process.env.ALGOLIA_KEY,
  }),
}
</script>

<template>
  <q-page
    padding
    class="q-mt-xl q-ml-xl"
  >
    <ais-index
      :app-id="ALGOLIA_APP_ID"
      :api-key="ALGOLIA_KEY"
      index-name="users"
    >
      <ais-search-box placeholder="Search players..." />
      <ais-results>
        <template slot-scope="{ result }">
          <h2>
            <a :href="result.path">
              <h2>
                <ais-highlight
                  :result="result"
                  attribute-name="name"
                />
              </h2>
            </a>
          </h2>
          <p>
            <ais-highlight
              :result="result"
              attribute-name="short_description"
            />
          </p>
        </template>
      </ais-results>
      <ais-powered-by />
    </ais-index>
  </q-page>
</template>
