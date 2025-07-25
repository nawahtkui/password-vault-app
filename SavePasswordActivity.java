
package com.nawah.passwordvault;

import android.content.ContentValues;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

public class SavePasswordActivity extends AppCompatActivity {
    EditText edtAccount, edtPassword;
    DBHelper dbHelper;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_save_password);

        edtAccount = findViewById(R.id.edtAccount);
        edtPassword = findViewById(R.id.edtPassword);
        Button btnSave = findViewById(R.id.btnSave);
        dbHelper = new DBHelper(this);

        btnSave.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String account = edtAccount.getText().toString();
                String password = edtPassword.getText().toString();

                SQLiteDatabase db = dbHelper.getWritableDatabase();
                ContentValues values = new ContentValues();
                values.put("account", account);
                values.put("password", password);
                long result = db.insert("vault", null, values);

                if (result != -1) {
                    Toast.makeText(SavePasswordActivity.this, "Saved!", Toast.LENGTH_SHORT).show();
                    finish();
                } else {
                    Toast.makeText(SavePasswordActivity.this, "Failed", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }
}
