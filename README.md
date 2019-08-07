# haroru-vueDatePicker
## Usage

```html
<html>
  <head>
  </head>
  <body>
    <div id="app">
      <h-date-picker></h-date-picker>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
    <script src="haroru-datepicker.min.js"></script>
    <script type="text/javascript">
      Vue.component('h-date-picker', HaroruDatePicker)
      var app = new Vue({
      el: '#app',
      data: {
      }
    })
    </script>
  </body>
</html>
```

## Props

| Prop | Description  | Type  | Default |
|------|--------------|-------|---------|
| format | Any format supported by moment | String | 'DD/MM/YYYY' |
| initialday | Sets the first day of the week 0-Sunday 1-Monday... | Number | 0 |
|locale|Any locale admited by moment|String|"en"|
|weekShow| Allows to show the week number | Boolean | false |

## Dev Setup

```
npm i
npm run dev
```

## Build Setup

```
npm i
npm run dev
```
