<!--Applications are stored in the database and can be viewed by everyone-->
<script lang="ts">
	//written in typescript
	import { applicationsRef } from '$lib/firebase/paths';
	import { onMount } from 'svelte';
	import { addDoc, getDocs } from 'firebase/firestore';

	//function to fetch all applications from the database and return them as an array
	async function getApplications() {
		const applications = await getDocs(applicationsRef);
		return applications.docs.map((doc) => doc.data());
	}

	let applications: any[] = [];
	//fetch applications on mount
	onMount(async () => {
		applications = await getApplications();
	});

	//function to submit an application to the database
	async function submitApplication(event: Event) {
		event.preventDefault();

		const form = event.target as HTMLFormElement;

		//get the form data
		const data = new FormData(form);
		//convert the form data to a json object
		const json = Object.fromEntries(data.entries());
		//add the application to the database
		await addDoc(applicationsRef, json);
		//fetch the applications again
		applications = await getApplications();
	}
</script>

<!--This page is used to submit applications to become an astronaut-->

<h1>Applications</h1>

<!--A scrollable section that displays all the applications-->
<section class="overflow-y-scroll h-96">
	<!--Loop through all the applications-->
	{#each applications as application}
		<!--Display the application-->
		<div class="border-2 border-black p-2">
			<h2>{application.name}</h2>
			<p>{application.message}</p>
		</div>
	{/each}
</section>

<!--The form to submit and application-->
<form on:submit|preventDefault={submitApplication}>
	<label for="name">Name</label>
	<input type="text" name="name" id="name" />
	<label for="message">Message</label>
	<textarea name="message" id="message" cols="30" rows="10" />
	<button type="submit">Submit</button>
</form>
