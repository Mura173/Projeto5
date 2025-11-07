import { getDonations } from "../Models/donationModel"

export async function controllerDonationSearch() {
    let donations = await getDonations()

    return { response: donations.status_code == 200 ? donations : donations.error, status_code: donations.status_code }
}