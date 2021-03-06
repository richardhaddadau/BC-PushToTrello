<!DOCTYPE html>
<html lang="en">
<head>
    @yield('title')

    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link rel="stylesheet" href={{ mix("/css/app.css") }}>

    <title>Push To Trello by 1VINE</title>
</head>
<body>
    <div id="root"></div>
    <script src={{ mix("/js/app.js") }}></script>
</body>
</html>
