<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{ $newsletter->subject }}</title>
</head>
<body>
    <div>
        {!! $content !!}
    </div>

    <hr>
    <p>
        If you wish to unsubscribe, <a href="{{ $unsubscribeUrl }}">click here</a>.
    </p>

    <img src="{{ $trackingPixel }}" width="1" height="1" style="display:none !important;" />
</body>
</html>
