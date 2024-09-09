<nav>
    <a href="/">Home</a>
    <a href="/projects">Projects</a>
    <a href="/settings">Settings</a>
</nav>

<slot></slot>

<style>
    nav {
        background-color: #333;
        padding: 1rem;
    }

    nav a {
        color: white;
        text-decoration: none;
        margin-right: 1rem;
    }

    nav a:hover {
        text-decoration: underline;
    }
</style>