import type { FavoritePokemon } from "@interfaces/favorite-pokemon"
import { createSignal, Show, type Component } from "solid-js"

interface Props {
    pokemon: FavoritePokemon
}


export const FavoritePokemonCard: Component<Props> = ({ pokemon }) => {

    const [isVisible, setIsVisible] = createSignal(true)

    const imageSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`

    const deleteFavorite = () => {
        const favorites = JSON.parse(
            localStorage.getItem('favorites') ?? '[]'
        ) as FavoritePokemon[];
        const newFavorites = favorites.filter(pokemon => pokemon.id !== pokemon.id);

        localStorage.setItem('favorites', JSON.stringify(newFavorites))
        setIsVisible(false)
    }
    return (
        <>
            <Show when={isVisible()}>
                <div class="flex flex-col justify-center items-center">
                    <a href={`/pokemons/${pokemon.name}`}>
                        <img
                            src={imageSrc}
                            alt={pokemon.name}
                            class="w-32 h-32"
                            style={`view-transition-name: ${pokemon.name}-image`}
                        />
                        <p class="capitalize"> #{pokemon.id} - {pokemon.name}</p>
                    </a>
                    <button class="flex flex-row items-center justify-between bg-red-600 p-2 rounded-sm shadow-sm text-white"
                        on:click={deleteFavorite}
                    >
                        <img src="/clean-trash.svg" alt="icono de basura" class="mr-2 " />
                        <span>Borrar</span>
                    </button>
                </div>
            </Show>

        </>
    )
}

