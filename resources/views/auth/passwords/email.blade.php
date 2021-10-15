@extends('layouts.app')

@section('content')
<div class="password-reset">
    <h1>Forgot password</h1>
    <div>
        @if (session('status'))
            <div>{{ session('status') }}</div>
        @endif
        <form method="POST" action="/password/email" class="reset-form">
            @csrf
            <div class="input-form">
                <label class="ml30 required" for="email">Email</label>
                <input id="email" type="email" name="email" value="{{ old('email') }}" autocomplete="email" autofocus>
                @error('email')
                    <p class="ml30 error-message">{{ $message }}</p>
                @enderror
            </div>
            <button class="button-middle" type="submit">Send an email</button>
            <a href="/login">Return to Sign In</a>
        </form>
    </div>
</div>
@endsection