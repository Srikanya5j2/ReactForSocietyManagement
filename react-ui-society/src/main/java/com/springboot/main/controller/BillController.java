package com.springboot.main.controller;

import java.util.List;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import com.springboot.main.exception.InvalidIdException;
import com.springboot.main.model.Bill;
import com.springboot.main.model.Resident;
import com.springboot.main.service.BillService;
import com.springboot.main.service.ResidentService;

@Controller
@RequestMapping("/bills")
@CrossOrigin(origins = {"http://localhost:3000"})
public class BillController {

	@Autowired
	private ResidentService residentService;
	@Autowired
	private BillService billService;
	
	

	/* Post bill by resident id */
	@PostMapping("/addBills/{residentId}")
	public ResponseEntity<?> postBill(@RequestBody Bill bill, @PathVariable("residentId") int residentId) {
		/* Fetch Resident object from db using residentId */
		try {
			Resident resident = residentService.getOne(residentId);
			// Attach Resident to Bill
			bill.setResident(resident);
			// save the bill in the DB
			bill = billService.postBill(bill);

			return ResponseEntity.ok().body(bill);
		} catch (InvalidIdException e) {

			return ResponseEntity.badRequest().body(e.getMessage());

		}
	}

	/* get all bills */
	@GetMapping("/getall")
	public ResponseEntity<?> getAllBills() {
		List<Bill> allBills = billService.getAllBills();
		return ResponseEntity.ok().body(allBills);
	}

	/* get all bill by resident id */
	@GetMapping("/getall/{residentId}")
	public ResponseEntity<?> getBillByResident(@PathVariable("residentId") int residentId) {
		/* Fetch resident object using given residentId */
		try {
			Resident resident = residentService.getOne(residentId);
			List<Bill> list = billService.getBillByResident(residentId);
			return ResponseEntity.ok().body(list);
		} catch (InvalidIdException e) {
			return ResponseEntity.badRequest().body(e.getMessage());

		}
	}
	
	@PutMapping("/bill/{id}")
	public ResponseEntity<?> updateBill(@RequestBody Bill bill,@PathVariable("id") int id){
		try {
			bill.setId(id);
			Bill updatebill=billService.updateBill(id,bill);
			return ResponseEntity.ok().body(updatebill);
		}catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
		
	}

	@GetMapping("/pending")
	public ResponseEntity<?> getAllPendingBills() {
	    try {
	        List<Bill> pendingBills = billService.getPendingBills(); // Assuming a method getPendingBills() exists in your service
	        return ResponseEntity.ok().body(pendingBills);
	    } catch (Exception e) {
	        return ResponseEntity.badRequest().body(e.getMessage());
	    }
	}
	
	

}
