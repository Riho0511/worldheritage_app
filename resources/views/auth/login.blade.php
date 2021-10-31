@extends('layouts.app')

@section('content')
<div class="login">
    <h1>Sign In</h1>
    <form method="POST" action="/login">
        @csrf
        <div class="input-form">
            <label class="ml30" for="email">Email</label>
            <input id="email" type="email" name="email" value="{{ old('email') }}" autocomplete="email" autofocus>
            @error('email')
                <p class="error-message ml30">{{ $message }}</p>
            @enderror
        </div>
        <div class="input-form">
            <label class="ml30" for="password">password</label>
            <input id="password" type="password" name="password" autocomplete="current-password">
            @error('password')
                <p class="error-message ml30">{{ $message }}</p>
            @enderror
        </div>
        <div>
            <input type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
            <label class="check-label" for="remember">remember me</label>
        </div>
        <button class="button-middle" type="submit">Sign in</button>
        <div>
            @if (Route::has('register'))
                <a href="/register">Create an account</a>
            @endif
            @if (Route::has('password.request'))
                <a href="/password/reset">Forgot password?</a>
            @endif
        </div>
    </form>
    <div class="guest">
        <p>アカウントを作成せずにログインしたい方</p>
        <button class="button-guest">
            <a href="/home">Guest</a>
        </button>
    </div>
</div>
@endsection